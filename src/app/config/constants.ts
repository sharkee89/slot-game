export const CONSTANTS = {
    REELS: 5,
    SYMBOLS: 3,
    SYMBOLS_LENGTH: 25,
    CHARACTERS: ['A', 'B', 'C', 'F', 'G', 'P', 'S'],
    LINES: [
        [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0] // top line
        ],
        [
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1] // middle lane
        ],
        [
            [0, 2], [1, 2], [2, 2], [3, 2], [4, 2] // bottom line
        ],
        [
            [0, 0], [1, 1], [2, 2], [3, 1], [4, 0] // V shape starting from top left
        ],
        [
            [0, 2], [1, 1], [2, 0], [3, 1], [4, 2] // V shape starting from bottom left
        ],
        [
            [0, 0], [1, 2], [2, 0], [3, 2], [4, 0] // W shape starting from top left
        ],
        [
            [0, 2], [1, 0], [2, 2], [3, 0], [4, 2] // M shape starting from bottom left
        ],
        [
            [0, 1], [1, 0], [2, 1], [3, 0], [4, 1] // M shape on top half
        ],
        [
            [0, 0], [1, 1], [2, 0], [3, 1], [4, 0] // W shape on top half
        ],
        [
            [0, 1], [1, 2], [2, 1], [3, 2], [4, 1] // W shape on bottom half
        ],
        [
            [0, 2], [1, 1], [2, 2], [3, 1], [4, 2] // M shape on bottom half
        ],
        [
            [0, 0], [1, 1], [2, 1], [3, 1], [4, 0] // U shape on top half
        ],
        [
            [0, 1], [1, 2], [2, 2], [3, 2], [4, 1] // U shape on bottom half
        ],
        [
            [0, 2], [1, 1], [2, 1], [3, 1], [4, 2] // Inverse U shape on bottom half
        ],
        [
            [0, 1], [1, 0], [2, 0], [3, 0], [4, 1] // Inverse U shape on top half
        ],
        [
            [0, 0], [1, 0], [2, 1], [3, 2], [4, 2] // Z shape from top left
        ],
        [
            [0, 2], [1, 2], [2, 1], [3, 0], [4, 0] // Z shape from bottom left
        ]
    ]
};
