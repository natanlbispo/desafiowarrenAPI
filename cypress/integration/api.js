import faker from "faker-br";

const name = faker.name.findName();
const email = faker.internet.email();
const senha = faker.internet.password();
const  baseUrl ="https://barrigarest.wcaquino.me"

const request = (methods, route, body, code) =>{
    cy.request(
        {
            method: methods,
            url: baseUrl+route,
            failOnStatusCode: false,
            body: body
        }).then(response => {
            expect(response.status).to.eq(code)
            if(code ===400){
                console.log(response);
                expect(response.body.error).to.be.eq("Problemas com o login do usuário");
            }
        
        });
}

describe("Testes API Plataforma Seu Barriga", () => {
    
    it("Realizar Login com usuário não cadstrado", () => {
        cy.fixture('user2').then( body => {
            body.name=name;
            body.email=email;
            body.senha=senha;
            request("POST", "/signin", body,400);
        })
    });

    it("Cadastro de um usuário ", () => {
        cy.fixture('user2').then( body => {
            body.name=name;
            body.email=email;
            body.senha=senha;
            request("POST", "/usuarios", body,201);
        })
    });

    it("Realizar Login com usuário cadstrado", () => {
        cy.fixture('user2').then( body => {
            body.name=name;
            body.email=email;
            body.senha=senha;
            request("POST", "/signin", body,200);
        })
    });
});