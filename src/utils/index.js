export const validate = function (vm, fields,form) {
    for (let field of fields) {
        if (!vm[form][field]) {
            vm[field + 'V'] = 'animation-shake'
            setTimeout(() => {
                vm[field + 'V'] = ''
            }, 1000)
            return false
        }

    }
    return true
}
