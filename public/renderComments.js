
const userSurfCommentBox = document.getElementById("user-surf-comment-board")


export async function renderComments() {


        try {
                const response = await fetch('http://localhost:8001/api/comment')

                if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`)
                }

                const data = await response.json()

                const userComments = data.filter(({name, comment}) => {
                return `
                        <p class="user-comment-name">${name}</p>
                        <p class="-user-comment-comment">${comment}</p>

                `
        }).join()

                userSurfCommentBox.innerhtml = userComments
        }

        catch(err) {
                console.log(err)
                JSON.stringify({message: 'Unable to get the data'})
        }


}