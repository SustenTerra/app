describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('https://sustenterra.netlify.app/login');
  });

  it('renders all fields and the login button', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Senha"]').should('be.visible');
    cy.contains('Login').should('be.visible');
  });

  it('shows an error message when fields are empty and login button is clicked', () => {
    cy.contains('Login').click();
    cy.contains('Preencha todos os campos!').should('be.visible');
  });

  it('navigate to the home page after successful login', () => {
    const user = {
      email: 'gabigol@flamengo.com',
      password: 'fakePassword',
    };

    // Intercepta a chamada de API de login e fornece uma resposta mockada
    cy.intercept('POST', 'https://sustentinta.up.railway.app/sessions', {
      statusCode: 200,
      body: {
        token: 'fakeToken',
        user: {
          email: user.email,
          full_name: 'Gabriel Barbosa',
          phone: '(21)99999-1111',
          id: 10,
        },
      },
    }).as('login');

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);
    cy.contains('Login').click();
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', 'https://sustenterra.netlify.app/');
  });

  it('shows an error message when login fails', () => {
    cy.get('input[placeholder="Email"]').type(
      'guilherme.farias@ccc.ufcg.edu.br',
    );
    cy.get('input[placeholder="Senha"]').type('wrongPassword');
    cy.contains('Login').click();

    cy.contains(
      'Email ou senha inválidos, verifique os dados informados.',
    ).should('be.visible');
  });
});
