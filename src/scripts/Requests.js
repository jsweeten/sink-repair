import {
    getRequests,
    deleteRequest,
    getCompletions,
    getPlumbers,
    saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
    const completions = getCompletions();
    const requests = getRequests();

    const completedRequests = requests.filter((requestObj) =>
        completions.find((completion) => completion.id === requestObj.id))
    const incompleteRequest = requests.filter((requestObj) =>
        !completions.find((completion) => completion.id === requestObj.id))

    let html = `
        <ul>
            ${incompleteRequest.map(incomplete).join("")}
            ${completedRequests.map(completed).join("")}
        </ul>
    `
    
    return html
}

const completed = (requestObj) => {
    return `<li class="completed" id="complete--${requestObj.id}">${requestObj.description}
    <button class="request_delete"
        id="request--${requestObj.id}">
        Delete
        </button>
        </li>`
}
const incomplete = (requestObj) => {
    
    const plumbers = getPlumbers()
    return `<li class="incomplete--${requestObj.id}">${requestObj.description}
    <select class="plumbers" id="plumbers">
    <option value="0">Choose</option>
    ${plumbers
        .map((plumber) => {
            return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`
        })
            .join("")}
    <button class="request_delete"
        id="request--${requestObj.id}">
        Delete
        </button>
        </li>`
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(EventTarget)
        }
    }
)