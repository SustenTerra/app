describe('SignUp Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/sign-up');
  });

  it('renders all fields and the sign up button', () => {
    cy.get('input[placeholder="Nome Completo"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Whatsapp para contato"]').should('be.visible');
    cy.get('input[placeholder="Senha"]').should('be.visible');
    cy.get('input[placeholder="Repetir a senha"]').should('be.visible');
    cy.contains('Cadastrar').should('be.visible');
  });

  it('shows an error message when fields are empty and sign up button is clicked', () => {
    cy.contains('Cadastrar').click();
    cy.contains('Preencha todos os campos!').should('be.visible');
  });

  it('shows an error message when passwords do not match', () => {
    cy.get('input[placeholder="Nome Completo"]').type('Fulano de Tal');
    cy.get('input[placeholder="Email"]').type('fulano@email.com');
    cy.get('input[placeholder="Whatsapp para contato"]').type('(99)99999-9999');
    cy.get('input[placeholder="Senha"]').type('password');
    cy.get('input[placeholder="Repetir a senha"]').type('differentPassword');
    cy.contains('Cadastrar').click();
    cy.contains('Senhas não correspondem').should('be.visible');
  });

  it('shows an error message when phone number is invalid', () => {
    cy.get('input[placeholder="Nome Completo"]').type('Fulano de Tal');
    cy.get('input[placeholder="Email"]').type('fulano@email.com');
    cy.get('input[placeholder="Whatsapp para contato"]').type('(99)123');
    cy.get('input[placeholder="Senha"]').type('password');
    cy.get('input[placeholder="Repetir a senha"]').type('password');
    cy.contains('Cadastrar').click();
    cy.contains('Número de telefone inválido.').should('be.visible');
  });

  it('navigates to the login page after successful sign up', () => {
    const user = {
      fullName: 'Gabriel Barbosa',
      email: 'gabigol@email.com',
      phone: '(21)99999-1111',
      password: 'flamengo@10',
    };

    // Intercepta a chamada de API de criação do usuário e fornece uma resposta mockada
    cy.intercept('POST', 'https://sustentinta.up.railway.app/users', {
      statusCode: 200,
      body: {
        email: user.email,
        full_name: user.fullName,
        phone: user.phone,
        id: 10,
      },
    }).as('signUp');

    cy.get('input[placeholder="Nome Completo"]').type(user.fullName);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Whatsapp para contato"]').type(user.phone);
    cy.get('input[placeholder="Senha"]').type(user.password);
    cy.get('input[placeholder="Repetir a senha"]').type(user.password);
    cy.contains('Cadastrar').click();

    // Verifica se a chamada de API foi bem-sucedida
    cy.wait('@signUp').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/login');
  });
});
