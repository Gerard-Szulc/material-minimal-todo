/// <reference types="cypress" />

context('Window', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('add task', () => {
        // https://on.cypress.io/window
        cy.get('button#add-task-form--show-button').click().should('have.class', 'opened')
        cy.get('#add-task-text').type('test todo task')
        cy.get('button#add-task-button').click()
        cy.contains("test todo task")
        cy.get('#route-button-Completed' ).click()
        cy.contains("test todo task").should('not.exist')

    })

    it('complete task', () => {
        // https://on.cypress.io/window
        cy.get('button#add-task-form--show-button').click().should('have.class', 'opened')
        cy.get('#add-task-text').type('test todo task')
        cy.get('button#add-task-button').click()
        cy.contains("test todo task").parent('div').siblings('div').find('input[type=checkbox]').check()

        cy.get('#route-button-Completed' ).click()
        cy.contains("test todo task").should('exist')

    })
})
