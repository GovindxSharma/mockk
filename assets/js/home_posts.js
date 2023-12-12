// {
//     let createPost=function(){
//         let newPostForm=$('#new-post-form');
//         newPostForm.submit(function(e){
//             e.preventDefault()

//             $.ajax({
//                 type :'post',
//                 url: '/posts/create',
//                 data  :newPostForm.serialize(),
//                 success :function(data){
//                     let newPost=newPostDom(data);
//                     console.log(newPost)
//                 },
//                 error :function(error){
//                     console.log(error.responseText)
//                 }
//             })
//         })
//     }



//     let newPostDom=function(post){
//         return $(`<li id="post-${post._id}">
//         <p>
          
//           <small>
//             <a class="delete-post-button" href="/posts/destroy/${ post.id }">X </a>
//           </small>
//           ${post.content}
//           <br />
//         //   <small> </small>
//         </p>
//         <div class="post-comments">
         
      
//           <form action="/comments/create" method="post">
//             <input type="text" name="comment" placeholder="Add Comment..." required />
//             <input type="hidden" name="post" value="${post._id}" />
//             <input type="submit" value="comment" />
//           </form>
        
      
//           <div class="post-comments-list">
//             <ul id="post-comments-${post._id}">
//               <%- include('comment') %>
//             </ul>
//           </div>
//         </div>
//       </li>
//       `)
//     }
//     createPost()
// }


