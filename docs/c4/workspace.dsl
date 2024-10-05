workspace "Team 5 Robo-Advize" "COP5818 Team 5 Final Project" {

    !identifiers hierarchical

    properties {
        "structurizr.dslEditor" "false"
    }

    model {
        oai = softwareSystem "OpenAI" {
            description "Provides AI-driven investment advice"
            tags "AI,API,External"
        }

        gf = softwareSystem "Google Finance" {
            description "Provides stock data"
            tags "API,External"
        }

        gauth = softwareSystem "Google Auth" {
            description "Provides Google Social Login"
            tags "Auth,External"
        }

        xauth = softwareSystem "X Auth" {
            description "Provides X Social Login"
            tags "Auth,External"
        }

        ra = softwareSystem "Team 5 Robo-Advize" {
            description "Robo-Advize provides users with a platform to manage their portfolios, access educational content, and receive AI-driven investment advice."
            wa = container "Web Application" {
                description "The Robo-Advize web application provides users with a platform to manage their portfolios, access educational content, and receive AI-driven investment advice."
                tags "UI,Middleware,Domain Logic"
                technology "NodeJS,NextJS,React,TypeScript"
                auth = component "Auth Module" {
                    description "Handles user authentication and authorization"
                    tags "Auth"
                    technology "OAuth2,OIDC,NextAuth.js"
                }
                portfolio = component "Portfolio Module" {
                    description "Manages user portfolios and provides investment advice"
                    tags "Portfolio"
                    technology "NextJS,React,TypeScript"
                }
                education = component "Education Module" {
                    description "Manages educational content and provides educational resources"
                    tags "Education"
                    technology "NextJS,React,TypeScript"
                }
            }
            pdb = container "Portfoiio Database" {
                description "Stores user portfolio data"
                tags "Database"
                technology "MongoDB,BSON"
            }
            udb = container "User Database" {
                description "Stores user data"
                tags "Database"
                technology "MongoDB,BSON"
            }
            edb = container "Education Content Database" {
                description "Stores educational content"
                tags "Database"
                technology "MongoDB,BSON"
            }
            eblob = container "Education Content Blob Storage" {
                description "Stores educational content"
                tags "Storage"
                technology "Blob Storage"
            }
        }

        a = person "Administrator" {
            description "Manages the day to day operations of the system"
        }

        u = person "User" {
            description "Customer who uses the system to manage their portfolio, access educational content, and receive investment advice"
        }

        # Relationships between elements
        a -> ra.wa "Manages" "https"
        u -> ra.wa "Uses" "https"
        ra.wa.portfolio -> ra.pdb "Reads portfolio data from and writes portfolio data to" "tcp/27017"
        ra.wa.auth -> ra.udb "Reads user data from and writes user data to" "tcp/27017"
        ra.wa.auth -> gauth "Authenticates users using" "https/oidc"
        ra.wa.auth -> xauth "Authenticates users using" "https/oidc"
        ra.wa.education -> ra.edb "Reads education content from" "tcp/27017"
        ra.wa.portfolio -> oai "Analyzes portfolio data using" "https"
        ra.wa.portfolio -> gf "Retrieves stock data from" "https"
        ra.wa.education -> ra.eblob "Stores educational content in" "https"
    }

    views {
    	systemContext ra "SystemContext" {
            include *
            autoLayout lr
        }

        container ra "Container" {
            include *
            autoLayout lr
        }

        component ra.wa "Components" {
            include *
            autoLayout lr
        }

        styles {
            element "Element" {
                background #3d6fdd
                color #FFFFFF
            }
            element "Person" {
                shape person
            }
            element "UI" {
                shape WebBrowser
            }
            element "Database" {
                background #2D882D
                shape cylinder
            }
            element "External" {
                background #CCCCCC
                color #444444
                shape Hexagon
            }
            element "Storage" {
                shape Folder
            }
        }
    }
}