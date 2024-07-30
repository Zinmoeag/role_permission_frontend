const getUrlPath = (url : string) => {
    let tempo = [];
    let paths = [] as any;

    url.split("/").forEach((item, index) => {
        if (index > 0){
            tempo.push(item)
            let pathObj = {
                name : item,
                url : tempo.join("/"),
            }
            paths.push(pathObj);
        }
    })
    return paths;
}
export default getUrlPath;