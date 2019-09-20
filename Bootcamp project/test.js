var dataObj=[];
        $(document).ready(function(){
          $(".getPost").click(getAllPost);
          $(".addPost").click(addPost);
          $(".editPost").click(editPost);
          $("tbody").on("click",".deletePost",null,function(){
            var id = $(this).attr("id");
             deletePost(id);
          });

  // GET Request
          function getAllPost()
          {
              $.ajax(
                {
                   type:'GET',
                   url: 'http://localhost:3000/posts',
                   success:function(data){
                    $("tbody").empty();
                     for(var i = 0; i < data.length; i++){
                   console.log("data",data);
                    // $(".post-cover").append("<h1 class='title'>"+ data[i].title +"</h1>");
                    // $(".post-cover").append("<p class='body'>"+ data[i].author +"</p>");
                    // $(".post-cover").append("<p class='Id'>"+ data[i].id +"</p>");
                  $("tbody").append("<tr>" + "<td>"+data[i].title+"</td>"+"<td>"+data[i].author+"</td>"+ "<td>"+ data[i].id+"</td>"+"<td><button id="+data[i].id+" class='deletePost'>Delete</button></td>"+"</tr>");
                 }
                   },
                   error:function(){
                     console.log("error");
                   }
                }
              );
          }

// POST Request
          function addPost()
          {
              var data = new Object();
              data.title = $("input[name='title']").val();
              data.author = $("input[name='author']").val();
              data.id = $("input[name='id']").val();
              console.log(data.title,data.author,data.id);
              $.ajax(
                {
                   type:'POST',
                   url: 'http://localhost:3000/posts',
                   data: JSON.stringify(data),
                   contentType:'application/json',
                   success:function(data){
                     getAllPost();
                     console.log("added succesfully");
                   },
                   error:function(){
                      console.log("error");
                   }
                }
              );
          }

// Delete Request
        function deletePost(id){
          console.log("id",id);
          $.ajax(
            {
               type:'DELETE',
               url: 'http://localhost:3000/posts/'+id,
               success:function(data){
                 getAllPost();
                 console.log("Deleted succesfully");
               },
               error:function(){
                  console.log("error");
               }
            }
          );
        }

// PUT Request
        function editPost()
        {
            var data = new Object();
            data.title = $("input[name='editTitle']").val();
            data.author = $("input[name='editAuthor']").val();
            data.id = $("input[name='editId']").val();
            console.log( data.title, data.author, data.id )
            $.ajax(
              {
                 type:'PUT',
                 url: 'http://localhost:3000/posts/'+data.id,
                 data: JSON.stringify(data),
                 contentType:'application/json',
                 success:function(data){
                   getAllPost();
                   console.log("Updated succesfully");
                 },
                 error:function(){
                    console.log("error");
                 }
              }
            );
        }
        });