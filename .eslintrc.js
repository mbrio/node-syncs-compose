module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
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
