
export default function fromToDate(from: string, to: string){
    const fromDate = from.split('/').map((x, index) => {
        if(index == 1){
            return Number(x) - 1
        }
        return Number(x)
    })

    const toDate = to.split('/').map((x, index) => {
        if(index == 1){
            return Number(x) - 1
        }
        return Number(x)
    })

    return {fromDate, toDate}
}