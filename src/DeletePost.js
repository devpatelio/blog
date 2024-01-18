import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from './createClient';

function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    const deleteBlogPost = async () => {
      try {
        // const response = await fetch(`http://localhost:1080/allblogs/${id}`, {
        //   method: "DELETE",
        // }); 
        const {data, error} = await supabase.from('blog_entries').delete().eq('resource_id', id);
        navigate("/");
        
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    };

    deleteBlogPost();
  }, [id, navigate]);

  return (
    <div>
      <p>Deleting Blog...</p>
    </div>
  );
}

export default DeletePost;
