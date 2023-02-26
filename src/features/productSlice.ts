import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import productData from '../db/data.json';
import {
  ProductRequestsData,
  ProductRequestComment,
  ProductRequest,
} from '../types/dataType';

// Define a type for the slice state
interface ProductState {
  isSidebarOpen: boolean;
  productRequsts: ProductRequestsData;
  productSuggestion: ProductRequestsData;
  currentUser: typeof productData.currentUser;
  selectedCategory: string;
  isEditing: boolean;
  isVoted: boolean;
  votedProductIds: number[];
}

// Define the initial state using that type
const initialState: ProductState = {
  isSidebarOpen: false,
  productRequsts: productData.productRequests,
  productSuggestion: productData.productRequests,
  currentUser: productData.currentUser,
  selectedCategory: 'All',
  isEditing: false,
  isVoted: false,
  votedProductIds: [],
};

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },

    // set isVoted
    setIsVoted: (state, action: PayloadAction<boolean>) => {
      state.isVoted = action.payload;
    },

    // set selected category
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },

    // sort by Payload Action
    sortBy: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'most upvotes':
          state.productSuggestion.sort((a, b) => b.upvotes - a.upvotes);
          break;
        case 'least upvotes':
          state.productSuggestion.sort((a, b) => a.upvotes - b.upvotes);
          break;
        case 'most comments':
          state.productSuggestion.sort(
            (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
          );
          break;
        case 'least comments':
          state.productSuggestion.sort(
            (a, b) => (a.comments?.length ?? 0) - (b.comments?.length ?? 0)
          );
      }
    },

    // filter by category payload
    filterByCategory: (state, action: PayloadAction<string>) => {
      if (action.payload === 'all') {
        state.productSuggestion = state.productRequsts;
      } else {
        state.productSuggestion = state.productRequsts.filter(
          product => product.category === action.payload
        );
      }
    },

    // update votes
    updateVotes: (state, action: PayloadAction<any>) => {
      const { id, upvotes } = action.payload;
      state.productSuggestion = state.productSuggestion.map(product => {
        if (product.id === id) {
          return {
            ...product,
            upvotes,
          };
        }
        return product;
      });
    },

    // remove voted product ids
    removeVotedProductIds: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      state.votedProductIds = state.votedProductIds.filter(
        productId => productId !== id
      );
    },

    // setis voted
    setVotedProductIds: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      state.votedProductIds = [...state.votedProductIds, id];
    },

    // add new feedback product
    addNewFeedback: (state, action: PayloadAction<ProductRequest>) => {
      const newProduct = action.payload;
      state.productSuggestion = [...state.productSuggestion, newProduct];
      state.productRequsts = [...state.productRequsts, newProduct];
    },

    // delete feedback product
    deleteFeedback: (state, action: PayloadAction<number>) => {
      // filter out the product with the id that matches the payload
      state.productSuggestion = state.productSuggestion.filter(
        product => product.id !== action.payload
      );

      state.productRequsts = state.productRequsts.filter(
        product => product.id !== action.payload
      );
    },

    // update feedback product
    updateFeedback: (state, action: PayloadAction<any>) => {
      const { id, title, description, category, status } = action.payload;
      state.productSuggestion = state.productSuggestion.map(product => {
        if (product.id === id) {
          return {
            ...product,
            title,
            description,
            category,
            status,
          };
        }
        return product;
      });

      state.productRequsts = state.productRequsts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            title,
            description,
            category,
            status,
          };
        }
        return product;
      });
    },

    // add new comment
    addNewComment: (state, action: PayloadAction<any>) => {
      const { id, newComment } = action.payload;

      state.productSuggestion = state.productSuggestion.map(product => {
        if (product.id === id) {
          return {
            ...product,
            comments: [...(product.comments ?? []), newComment],
          };
        }
        return product;
      });

      state.productRequsts = state.productRequsts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            comments: [...(product.comments ?? []), newComment],
          };
        }
        return product;
      });
    },

    // add new reply to comment
    addNewReply: (state, action: PayloadAction<any>) => {
      const { id, commentId, newReply, replyingTo } = action.payload;
      console.log(id, commentId, newReply, replyingTo);

      // if commentId is undefined, then we are replying to a  reply and not a comment
      if (commentId === undefined) {
        state.productSuggestion = state.productSuggestion.map(product => {
          if (product.id === id) {
            return {
              ...product,
              comments: product.comments?.map(comment => {
                // find the comment that we are replying to
                if (comment.replies) {
                  const reply = comment.replies.find(
                    reply => reply.replyingTo === replyingTo
                  );
                  if (reply) {
                    return {
                      ...comment,
                      replies: [...comment.replies, newReply],
                    };
                  }
                }
                return comment;
              }),
            };
          }
          return product;
        });
        return;
      }

      state.productSuggestion = state.productSuggestion.map(product => {
        if (product.id === id) {
          return {
            ...product,
            comments: product.comments?.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies ?? []), newReply],
                };
              }
              return comment;
            }),
          };
        }
        return product;
      });
    },
  },
});

export const {
  setIsSidebarOpen,
  sortBy,
  filterByCategory,
  setSelectedCategory,
  setIsEditing,
  addNewFeedback,
  removeVotedProductIds,
  deleteFeedback,
  updateFeedback,
  addNewComment,
  addNewReply,
  updateVotes,
  setIsVoted,
  setVotedProductIds,
} = productSlice.actions;

export default productSlice.reducer;
