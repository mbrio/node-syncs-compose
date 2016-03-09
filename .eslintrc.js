module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "plugins": [
        "flowtype"
    ],
    "globals": {
        "jest": true,
        "describe": true,
        "it": true,
        "fit": true,
        "pit": true,
        "xit": true,
        "fail": true,
        "expect": true
    },
    "rules": {
        "flowtype/require-parameter-type": 1,
        "flowtype/require-return-type": [
            1,
            "always",
            {
                "annotateUndefined": "never"
            }
        ],
        "flowtype/space-after-type-colon": [
            1,
            "always"
        ],
        "flowtype/space-before-type-colon": [
            1,
            "never"
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
