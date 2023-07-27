import { locales as AdminJSLocales } from "adminjs";

export default {
  language: "pt-BR", // default language of application (also fallback)],
  availableLanguages: Object.keys(AdminJSLocales),
  translations: {
    messages: {
      loginWelcome:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    labels: {
      User: "Usuários",
      Partners: "Parceiros",
      Admin: "Administradores",
      admin: "Administradores",
      partners: "Parceiros",
    },
    properties: {
      name: "Nome",
      cpf: "CPF",
      email: "E-mail",
      createdAt: "Criado em",
      updatedAt: "Atualizado em",
      phone: "Telefone",
      cnpj: "CNPJ",
      isDeleted: "Deletado",
      isVerified: "Verificado",
      isBlocked: "Bloqueado",
    },
    values: {
      yes: "Sim",
      no: "Não",
    },
  },
};
