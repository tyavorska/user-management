describe('Authentication Flow', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(`${baseUrl}/signin`);
  });

  describe('Sign In', () => {
    it('should display the sign-in page', () => {
      cy.contains('Sign In').should('be.visible');
    });

    it('should show validation error for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('[type="email"]:invalid').should('exist');
      cy.get('[type="password"]:invalid').should('exist');
    });

    it('should show an error for invalid credentials', () => {
      cy.get('input[type="email"]').type('invalid@user.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Something went wrong').should('be.visible');
    });

    it('should log in successfully with valid credentials', () => {
      cy.get('input[type="email"]').type('eve.holt@reqres.in');
      cy.get('input[type="password"]').type('cityslicka');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/dashboard');
    });

    it('should navigate to the sign-up page', () => {
      cy.contains("Don't have an account?").click();
      cy.url().should('include', '/signup');
    });
  });

  describe('Sign Up', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/signup`);
    });

    it('should display the sign-up page', () => {
      cy.contains('Sign Up').should('be.visible');
    });

    it('should show validation error for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('[type="email"]:invalid').should('exist');
      cy.get('[type="password"]:invalid').should('exist');
      cy.get('[type="password"]').eq(1).should('have.attr', 'required');
    });

    it('should show an error for mismatched passwords', () => {
      cy.get('input[type="email"]').type('test.user@reqres.in');
      cy.get('input[type="password"]').first().type('password123');
      cy.get('input[type="password"]').last().type('password321');
      cy.get('button[type="submit"]').click();
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('should register successfully with valid inputs', () => {
      cy.get('input[type="email"]').type('new.user@reqres.in');
      cy.get('input[type="password"]').first().type('password123');
      cy.get('input[type="password"]').last().type('password123');
      cy.get('button[type="submit"]').click();

      console.log(cy.url());

      cy.url().should('include', '/dashboard');
    });

    it('should show an error for registration failure', () => {
      cy.intercept('POST', '**/register', {
        statusCode: 400,
        body: { error: 'Registration failed' },
      });

      cy.get('input[type="email"]').type('test.user@reqres.in');
      cy.get('input[type="password"]').first().type('password123');
      cy.get('input[type="password"]').last().type('password123');
      cy.get('button[type="submit"]').click();

      cy.contains('Registration failed').should('be.visible');
    });

    it('should navigate to the sign-in page', () => {
      cy.contains('Already have an account?').click();
      cy.url().should('include', '/signin');
    });
  });
});
