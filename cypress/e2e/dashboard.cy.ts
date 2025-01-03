describe('Dashboard Component', () => {
  const mockUsers = [
    { id: 1, email: 'user1@example.com', first_name: 'John', last_name: 'Doe' },
    {
      id: 2,
      email: 'user2@example.com',
      first_name: 'Jane',
      last_name: 'Smith',
    },
  ];
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.intercept('GET', '/api/users?page=1', (req) => {
      console.log('Intercepted request:', req);
      req.reply({
        statusCode: 200,
        body: { data: mockUsers },
      });
    }).as('getUsers');

    cy.intercept('POST', '/api/users', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 3,
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        },
      });
    }).as('createUser');

    cy.visit(`${baseUrl}/signin`);

    cy.get('input[type="email"]').type('eve.holt@reqres.in');
    cy.get('input[type="password"]').first().type('pistol');
    cy.get('button[type="submit"]').click();
  });

  it('fetches and displays the user list on load', () => {
    cy.get('table').within(() => {
      cy.contains('user1@example.com').should('be.visible');
      cy.contains('John').should('be.visible');
      cy.contains('Doe').should('be.visible');

      cy.contains('user2@example.com').should('be.visible');
      cy.contains('Jane').should('be.visible');
      cy.contains('Smith').should('be.visible');
    });
  });

  it('handles user creation successfully', () => {
    cy.get('button').contains('Create New User').click();
    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[id="email"]').type('newuser@example.com');
      cy.get('input[id="first_name"]').type('New');
      cy.get('input[id="last_name"]').type('User');
      cy.get('button').contains('Create').click();
    });

    cy.wait('@createUser');

    cy.get('table').within(() => {
      cy.contains('newuser@example.com').should('be.visible');
      cy.contains('New').should('be.visible');
      cy.contains('User').should('be.visible');
    });
  });

  it('handles user creation errors gracefully', () => {
    cy.intercept('POST', '/api/users', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('createUserError');

    cy.get('button').contains('Create New User').click();
    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[id="email"]').type('newuser@example.com');
      cy.get('input[id="first_name"]').type('New');
      cy.get('input[id="last_name"]').type('User');
      cy.get('button').contains('Create').click();
    });

    cy.wait('@createUserError');

    cy.contains('Failed to create user!').should('be.visible');
  });

  it('allows cancellation of the user creation form', () => {
    cy.get('button').contains('Create New User').click();
    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[id="email"]').type('newuser@example.com');
      cy.get('button').contains('Cancel').click();
    });

    cy.get('table').within(() => {
      cy.contains('newuser@example.com').should('not.exist');
    });
  });

  it('opens the UserForm when "Create New User" button is clicked', () => {
    cy.get('button').contains('Create New User').click();
    cy.get('div[role="dialog"]').within(() => {
      cy.contains('Create New User').should('be.visible');
    });
  });

  it('adds a new user to the list after form submission', () => {
    cy.get('button').contains('Create New User').click();

    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[id="email"]').type('newuser@example.com');
      cy.get('input[id="first_name"]').type('New');
      cy.get('input[id="last_name"]').type('User');
      cy.get('button').contains('Create').click();
    });

    cy.wait('@createUser');
    cy.get('table').within(() => {
      cy.contains('newuser@example.com').should('be.visible');
      cy.contains('New').should('be.visible');
      cy.contains('User').should('be.visible');
    });
  });

  it('handles form cancellation without adding a user', () => {
    cy.get('button').contains('Create New User').click();

    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[id="email"]').type('newuser@example.com');
      cy.get('button').contains('Cancel').click();
    });

    cy.get('table').within(() => {
      cy.contains('newuser@example.com').should('not.exist');
    });
  });

  it('displays an error message when the user creation API fails', () => {
    cy.intercept('POST', '/api/users', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('createUserError');

    cy.get('button').contains('Create New User').click();

    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[id="email"]').type('newuser@example.com');
      cy.get('input[id="first_name"]').type('New');
      cy.get('input[id="last_name"]').type('User');
      cy.get('button').contains('Create').click();
    });

    cy.wait('@createUserError');
    cy.contains('Failed to create user!').should('be.visible');
  });
});
