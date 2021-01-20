export const case_break = ['case-break', {
    onElementRender: (options, { data, render, next }) => {
        const { fn } = options
        if (!!fn.apply(data)) {
            return { data, render, next: null }
        } else {
            return { data, render: null, next }
        }
    }
}]