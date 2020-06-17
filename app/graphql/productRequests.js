import {gql} from '@apollo/client';

export const PRODUCTS = gql`
  query products {
    products {
      id
      thumbs {
        url
        formats {
          thumbnail {
            url
          }
          small {
            url
          }
        }
      }
      client {
        id
        brand
        responsible
        thumb {
          url
        }
      }
      description
      productName
      price
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query product($id: String) {
    product(id: $id) {
      id
      productId
      productName
      description
      client {
        id
        brand
        responsible
        thumb {
          url
        }
      }
      thumbs {
        url
        formats {
          thumbnail {
            url
          }
          small {
            url
          }
        }
      }
      price
    }
  }
`;

export const COMMENTS = gql`
  query comments($productId: String) {
    comments(productId: $productId) {
      id
      user
      userId
      comment
      createdDate
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($comment: String, $productId: String, $userId: String) {
    addComment(comment: $comment, productId: $productId, userId: $userId) {
      id
      user
      userId
      comment
      createdDate
    }
  }
`;
