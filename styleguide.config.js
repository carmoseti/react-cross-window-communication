module.exports = {
    components: 'src/*/[A-z]*.tsx',
    propsParser: require('react-docgen-typescript').withCustomConfig(
        './tsconfig.json'
    ).parse
}