describe('UserTable Component', () => {
  const apiBaseUrl = 'https://reqres.in/api';
  const users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      id: 2,
      email: 'jane.doe@example.com',
      first_name: 'Jane',
      last_name: 'Doe',
    },
  ];

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-token');
    });
    cy.intercept('GET', '/api/users?page=1', {
      statusCode: 200,
      body: { data: users },
    }).as('getUsers');

    cy.intercept('DELETE', `${apiBaseUrl}/users/*`, { statusCode: 204 }).as(
      'deleteUser'
    );
    cy.intercept('PUT', `${apiBaseUrl}/users/*`, (req) => {
      req.reply({
        id: req.body.id,
        ...req.body,
      });
    }).as('updateUser');

    const baseUrl = 'http://localhost:3000';
    cy.visit(`${baseUrl}/dashboard`);
  });

  it('should render the user list', () => {
    cy.wait('@getUsers');

    cy.get('table').within(() => {
      cy.contains('td', 'john.doe@example.com').should('be.visible');
      cy.contains('td', 'jane.doe@example.com').should('be.visible');
    });
  });

  it('should delete a user', () => {
    cy.contains('button', 'Delete').first().click();

    cy.wait('@deleteUser').then((interception) => {
      expect(interception.response?.statusCode).to.eq(204);
    });

    cy.get('table').within(() => {
      cy.contains('td', 'john.doe@example.com').should('not.exist');
      cy.contains('td', 'jane.doe@example.com').should('be.visible');
    });

    cy.get('.Toastify__toast').should('contain', 'User deleted successfully!');
  });

  it('should edit a user', () => {
    cy.contains('button', 'Edit').first().click();

    cy.get('input[id="first_name"]').clear().type('Johnathan');
    cy.get('input[id="last_name"]').clear().type('Smith');
    cy.get('button').contains('Save').click();

    cy.wait('@updateUser').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.request.body.first_name).to.eq('Johnathan');
      expect(interception.request.body.last_name).to.eq('Smith');
    });

    cy.get('table').within(() => {
      cy.contains('td', 'Johnathan').should('be.visible');
      cy.contains('td', 'Smith').should('be.visible');
    });

    cy.get('.Toastify__toast').should('contain', 'User updated successfully!');
  });

  it('should show an error toast if delete fails', () => {
    cy.intercept('DELETE', `${apiBaseUrl}/users/*`, { statusCode: 500 }).as(
      'deleteUserFail'
    );

    cy.contains('button', 'Delete').first().click();

    cy.wait('@deleteUserFail').then((interception) => {
      expect(interception.response?.statusCode).to.eq(500);
    });

    cy.get('.Toastify__toast').should('contain', 'Failed to delete user!');
  });

  it('should show an error toast if edit fails', () => {
    cy.intercept('PUT', `${apiBaseUrl}/users/*`, { statusCode: 500 }).as(
      'updateUserFail'
    );

    cy.contains('button', 'Edit').first().click();

    cy.get('input[id="first_name"]').clear().type('Johnathan');
    cy.get('input[id="last_name"]').clear().type('Smith');
    cy.get('button').contains('Save').click();

    cy.wait('@updateUserFail').then((interception) => {
      expect(interception.response?.statusCode).to.eq(500);
    });

    cy.get('.Toastify__toast').should('contain', 'Failed to update user!');
  });
});
