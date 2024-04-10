describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/login');
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
      email: 'testelocal@email.com',
      password: 'testelocal@email.com',
    };

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);
    cy.contains('Login').click();
    cy.url().should('eq', 'http://localhost:8081/');
  });

  it('shows an error message when login fails', () => {
    const user = {
      email: 'testelocal@email.com',
      password: 'wrongPassword',
    };

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Senha"]').type(user.password);
    cy.contains('Login').click();

    cy.contains(
      'Email ou senha inválidos, verifique os dados informados.',
    ).should('be.visible');
  });
});
