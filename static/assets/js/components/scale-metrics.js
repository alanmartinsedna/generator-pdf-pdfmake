export function generateScale({
        parts = []
    }) {

    // 🔒 validação
    if (!Array.isArray(parts) || parts.length === 0) {
        console.error('Escala inválida: nenhuma parte informada');
        return { text: 'Escala inválida' };
    }
    // =========================
    // 🔷 LINHA DAS CORES (SEM ESPAÇO)
    // =========================
    const colorColumns = parts.map(part => ({
        width: '*',

        table: {
            widths: ['*'],
            heights: [3],
            body: [
                [
                    {
                        text: ' ', // 👈 necessário pra renderizar altura
                        fontSize: 1,
                        lineHeight: 1,
                        margin: [0, 0, 0, 0]
                    }
                ]
            ]
        },

        layout: {
            fillColor: () => part.color || '#cccccc',
            hLineWidth: () => 0,
            vLineWidth: () => 0
        }
    }));

    // =========================
    // 📦 RETORNO FINAL
    // =========================
    return {

        stack: [

            // ESCALA COLORIDA (SEM GAP)
            {
                columns: colorColumns,
                columnGap: 0 // 👈 garante que não exista espaço
            },

            // tabela da legenda
            {
                table: {
                    widths: ['*', '*', '*', '*', '*'],
                    body:[
                        [
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#ff4d4f'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível I - Inicial',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#ff6f61'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível II - Básico',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#ff8c42'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível III - Emergente',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#faad14'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível IV - Definido',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#fadb14'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível V - Gerenciado' ,
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                        ],
                        [
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#d3f261'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível VI - Integrado',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#95de64'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível VII - Padronizado' ,
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#52c41a'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível VIII - Estruturado',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#36cfc9'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível IX - Monitorado',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                            {
                                stack: [
                                    {
                                        columns: [
                                            {
                                                width: 12,
                                                canvas: [
                                                    {
                                                        type: 'rect',
                                                        x: 0,
                                                        y: 0,
                                                        w: 12,
                                                        h: 12,
                                                        r: 6,
                                                        color: '#1890ff'
                                                    }
                                                ],
                                                relativePosition: {
                                                    y: 0
                                                }
                                            },
                                            {
                                                width: '*',
                                                text: 'Nível X - Otimizado',
                                                fontSize: 10,
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        columnGap: 0
                                    },
                                ],
                                margin: [0, 0, 0, 5]
                            },
                        ]
                    ]
                },
                layout: 'noBorders',
                margin: [0, 5, 0, 0]
            }

        ],

        margin: [0, 10, 0, 10]
    };
}



