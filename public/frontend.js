import { renderComments } from './renderComments.js'

const surfStatForm = document.getElementById("update-surf-stat-form")
const addUserReportBtn = document.getElementById("btn-add-user-report")

const userSurfCommentForm = document.getElementById("user-surf-comment-form")
//const addCommentBtn = document.getElementById("btn-add-user-comment")


        //------------Pops open form to add user report------------//
addUserReportBtn.addEventListener('click', function() {
        surfStatForm.classList.toggle("visible")
})


renderComments()


//------------Post Comment Form------------//
userSurfCommentForm.addEventListener('submit', async (e) => {
        e.preventDefault()


        const formData = new FormData(userSurfCommentForm)
        const formObj = Object.fromEntries(formData)

        try {
                
                
                await fetch('http://localhost:8001/api/comment', {
                        method: 'POST',
                        header: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formObj)

                })

                

        }
        catch(err) {
                console.log(err)
                JSON.stringify({message: 'Unable to submit the form'})
        }

        userSurfCommentForm.reset()
        //renderNewComment()
})

