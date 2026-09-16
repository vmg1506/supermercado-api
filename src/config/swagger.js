import swaggerJsdoc from 'swagger-jsdoc'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Supermercado API',
            version: '1.0.0',
            description: 'API REST para la gestión de un supermercado: usuarios, proveedores, productos y ventas. Construida con Node.js, Express y Sequelize (PostgreSQL).'
        },
        servers: [
            {
                url: 'http://localhost:' + (process.env.PORT || 3000),
                description: 'Servidor local'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Ana Gómez' },
                        email: { type: 'string', format: 'email', example: 'ana@example.com' },
                        role: { type: 'string', enum: ['client', 'admin'], example: 'client' }
                    }
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: { type: 'string', example: 'Ana Gómez' },
                        email: { type: 'string', format: 'email', example: 'ana@example.com' },
                        role: { type: 'string', enum: ['client', 'admin'], example: 'client' }
                    }
                },
                Provider: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Distribuidora Andina' },
                        phone: { type: 'string', example: '3001234567' },
                        email: { type: 'string', format: 'email', example: 'contacto@andina.com' },
                        city: { type: 'string', example: 'Manizales' }
                    }
                },
                ProviderInput: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string', example: 'Distribuidora Andina' },
                        phone: { type: 'string', example: '3001234567' },
                        email: { type: 'string', format: 'email', example: 'contacto@andina.com' },
                        city: { type: 'string', example: 'Manizales' }
                    }
                },
                Product: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Arroz 1kg' },
                        description: { type: 'string', example: 'Arroz blanco' },
                        price: { type: 'number', format: 'float', example: 4500 },
                        stock: { type: 'integer', example: 100 },
                        providerId: { type: 'integer', example: 1 }
                    }
                },
                ProductInput: {
                    type: 'object',
                    required: ['name', 'price'],
                    properties: {
                        name: { type: 'string', example: 'Arroz 1kg' },
                        description: { type: 'string', example: 'Arroz blanco' },
                        price: { type: 'number', format: 'float', example: 4500 },
                        stock: { type: 'integer', example: 100 },
                        providerId: { type: 'integer', example: 1 }
                    }
                },
                SaleItemInput: {
                    type: 'object',
                    required: ['productId', 'quantity'],
                    properties: {
                        productId: { type: 'integer', example: 1 },
                        quantity: { type: 'integer', example: 3 }
                    }
                },
                SaleInput: {
                    type: 'object',
                    required: ['userId', 'items'],
                    properties: {
                        userId: { type: 'integer', example: 1 },
                        items: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/SaleItemInput' }
                        }
                    }
                },
                Sale: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        userId: { type: 'integer', example: 1 },
                        total: { type: 'number', format: 'float', example: 13500 }
                    }
                },
                SaleDetail: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        productId: { type: 'integer', example: 1 },
                        productName: { type: 'string', example: 'Arroz 1kg' },
                        quantity: { type: 'integer', example: 3 },
                        price: { type: 'number', format: 'float', example: 4500 }
                    }
                },
                SaleWithDetails: {
                    allOf: [
                        { $ref: '#/components/schemas/Sale' },
                        {
                            type: 'object',
                            properties: {
                                details: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/SaleDetail' }
                                }
                            }
                        }
                    ]
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Recurso no encontrado' },
                        error: { type: 'string', example: 'Detalle técnico del error' }
                    }
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Datos inválidos' },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: { type: 'string', example: 'email' },
                                    message: { type: 'string', example: 'El email no tiene un formato válido' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
   
    apis: ['./src/routes/*.js']
}
export const swaggerSpec = swaggerJsdoc(options)