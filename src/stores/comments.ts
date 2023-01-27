import { defineStore } from 'pinia';
import axios from 'axios'

const baseURL = 'https://jsonplaceholder.typicode.com/comments'

export const useCommentsStore = defineStore( 'commentsStore', {
    state: () => ({
      comments: [],
      comment: []
    }),
  
    actions: {
      async getAllComments() {
        try {
          const data = await axios.get(baseURL)
          this.comments = data.data
        }
        catch (error) {
          alert(error)
          console.log(error)
        }
      },
      async getSingleComment(id) {
        try {
          const data = await axios.get(`${baseURL}/${id}`)
          this.comment = data.data
        }
        catch (error) {
          alert(error)
          console.log(error)
        }
      },
    }
  });