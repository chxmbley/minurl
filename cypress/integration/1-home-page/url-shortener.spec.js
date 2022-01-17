import { APP_BASE_URL, LONG_INPUT_URL_MESSAGES, OUTPUT_URL_MESSAGES } from '../../../src/lib/constants';
import { MINIFY_ENDPOINT } from '../../../src/lib/api/constants';
import RandExp from 'randexp';
import StatusCodes from 'http-status-codes';

const LONG_URL =
  'https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8';

const getRandomUrl = () => {
  const randomUrlRegex = new RandExp(/[a-z0-9]{12}/);
  return `https://${randomUrlRegex.gen()}.com/${randomUrlRegex.gen()}`;
};

describe('Home page', () => {
  beforeAll(() => {
    cy.exec('npm run db:reset:ci');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', MINIFY_ENDPOINT).as('minifyUrlRequest');
    cy.get('input[type="url"]').as('input');
    cy.get('button[role="submit"]').as('submit');
  });

  it('loads the page in a default state', () => {
    cy.get('@input').should('have.value', '').should('not.be.disabled').should('not.have.attr', 'readonly');
    cy.get('@submit').should('have.attr', 'title', 'Submit').should('be.disabled');
  });

  it('minifies a valid URL', () => {
    cy.get('@input').type(LONG_URL, { delay: 0 }).should('have.value', LONG_URL);
    cy.get('@submit').should('not.be.disabled');

    // Check that appropriate message is displayed for the input URL
    cy.get('button[role="submit"] + span').should(($message) => {
      const text = $message.text();
      expect(LONG_INPUT_URL_MESSAGES).to.include(text);
    });

    cy.get('@submit').click().should('be.disabled');
    cy.get('@input').should('be.disabled');

    cy.wait('@minifyUrlRequest');

    cy.get('@submit').should('not.be.disabled').should('have.attr', 'title', 'Reset');

    cy.get('@input')
      .should('not.be.disabled')
      .should('have.attr', 'readonly', 'readonly')
      .should(($input) => {
        const shortenedUrl = $input.val();
        const shortenedUrlRegex = new RegExp(`^${APP_BASE_URL}/[a-z0-9]{3,32}$`, 'i');
        expect(shortenedUrl).to.match(shortenedUrlRegex);
      });

    // Check that appropriate message is displayed for the shortened URL
    cy.get('button[role="submit"] + span').should(($message) => {
      const text = $message.text();
      expect(OUTPUT_URL_MESSAGES).to.include(text);
    });

    cy.get('button[type="button"]').should('contain.text', 'copy', { matchCase: false });
  });

  it('disallows invalid URLs', () => {
    const invalidUrl = 'not-a-url';

    cy.get('@input')
      .type(invalidUrl, { delay: 0 })
      .should('have.value', invalidUrl)
      .then(($input) => $input[0].checkValidity())
      .should('be.false');

    // Check that appropriate message is displayed for the shortened URL
    cy.get('button[role="submit"] + span').should(($message) => {
      const text = $message.text();
      expect(text).to.match(/^invalid url$/);
    });

    cy.get('@submit').should('be.disabled');
  });

  it('disallows URLs that may already be existing shortened URLs', () => {
    const url = `${APP_BASE_URL}/abc123`;

    cy.get('@input')
      .type(url, { delay: 0 })
      .should('have.value', url)
      .should('not.be.disabled')
      .should('not.have.attr', 'readonly');

    cy.get('@submit').should('be.disabled');
  });

  it('resets the input when submitted after a URL has been shortened', () => {
    cy.get('@input').type(LONG_URL, { delay: 0 }).should('have.value', LONG_URL);
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('@submit').should('have.attr', 'title', 'Reset').click();

    cy.get('@input').should('have.value', '').should('not.have.attr', 'readonly');
    cy.get('@submit').should('have.attr', 'title', 'Submit').should('be.disabled');

    cy.get('button[role="submit"] + span').should(($message) => {
      const text = $message.text();
      expect(text).to.be.empty;
    });
  });

  it('generates a new shortened URL for unique input URLs', () => {
    let firstShortenedUrl;

    const randomUrlA = getRandomUrl();
    const randomUrlB = getRandomUrl();

    cy.get('@input').type(randomUrlA, { delay: 0 }).should('have.value', randomUrlA);
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('@input').then(($input) => {
      firstShortenedUrl = $input.val();
    });

    // Reset URL
    cy.get('@submit').should('have.attr', 'title', 'Reset').click();

    cy.get('@input').type(randomUrlB, { delay: 0 }).should('have.value', randomUrlB);
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('@input').then(($input) => {
      expect($input.val()).not.to.equal(firstShortenedUrl);
    });
  });

  it('generates the same shortened URL for duplicate input URLs', () => {
    const randomUrl = getRandomUrl();

    cy.get('@input').type(randomUrl, { delay: 0 }).should('have.value', randomUrl);
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('@input').then(($input) => {
      const firstShortenedUrl = $input.val();

      // Reset
      cy.get('@submit').should('have.attr', 'title', 'Reset').click();

      cy.get('@input').type(randomUrl, { delay: 0 }).should('have.value', randomUrl);
      cy.get('@submit').click();

      cy.wait('@minifyUrlRequest');

      cy.get('@input').then(($input) => {
        expect($input.val()).to.equal(firstShortenedUrl);
      });
    });
  });

  it('copies the shortened URL to the clipboard when the "copy" button is clicked', () => {
    let shortenedUrl;

    cy.visit('http://localhost:3000');
    cy.intercept('POST', MINIFY_ENDPOINT).as('minifyUrlRequest');

    cy.get('@input').type(getRandomUrl(), { delay: 0 });
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('button[type="button"]')
      .should('contain.text', 'copy', { matchCase: false })
      .click()
      .should('contain.text', 'copied!', { matchCase: false });

    cy.get('@input').then(($input) => (shortenedUrl = $input.val()));

    cy.window().then(async ({ navigator }) => {
      const copiedText = await navigator.clipboard.readText();
      expect(copiedText).to.equal(shortenedUrl);
    });
  });

  it('resets the "copy" button when the input is reset', () => {
    cy.get('@input').type(LONG_URL, { delay: 0 });
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('button[type="button"]')
      .should('contain.text', 'copy', { matchCase: false })
      .click()
      .should('contain.text', 'copied!', { matchCase: false });

    // Reset
    cy.get('@submit').click();
    cy.get('button[type="button"]').should('not.exist');

    cy.get('@input').type(LONG_URL, { delay: 0 });
    cy.get('@submit').click();

    cy.get('button[type="button"]').should('contain.text', 'copy', { matchCase: false });
  });

  it('redirects to a full URL when a shortened URL is requested', () => {
    cy.get('@input').type(LONG_URL, { delay: 0 });
    cy.get('@submit').click();

    cy.wait('@minifyUrlRequest');

    cy.get('@input').then(($input) => {
      const shortenedUrl = $input.val();

      cy.request({
        method: 'GET',
        url: shortenedUrl,
        followRedirect: false,
      }).then((res) => {
        const destination = res.headers.location;
        expect(destination).to.equal(LONG_URL);
        expect(res.status).to.equal(StatusCodes.TEMPORARY_REDIRECT);
      });
    });
  });

  it('redirects to the home page when a short URL does not exist', () => {
    cy.visit('/idontexist');
    cy.location('pathname').should('eq', '/');
  });
});
