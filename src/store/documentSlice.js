import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URL = "http://localhost:8000/documents";

const defaultData = {
  data: [],
  filters: [],
  quantity: 0,
  nextKey: 0,
  addingDocument: false,
  deletingDocument: false,
  loading: true,
};

export const fetchAllDocuments = createAsyncThunk(
  "documents/fetchAllDocuments",
  async () => {
    const response = await fetch(URL);
    return response.json();
  }
);
export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (id) => {
    let deleteURL = URL + "/" + id;
    const response = await fetch(deleteURL, {
      method: "DELETE",
    });
    return response.json();
  }
);
export const addNewDocument = createAsyncThunk(
  "documents/addNewDocument",
  async (data) => {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
);

export const documentSlice = createSlice({
  name: "documents",
  initialState: { documents: defaultData, status: "idle", error: null },
  reducers: {
    filterDocuments: (state, action) => {
      if (action.payload.active) {
        state.documents.filters.push(action.payload.type);
      } else {
        state.documents.filters = state.documents.filters.filter(
          (existingFilter) => {
            return action.payload.type !== existingFilter;
          }
        );
      }
    },
  },
  extraReducers: {
    [fetchAllDocuments.pending]: (state) => {
      state.documents.loading = true;
      state.documents.addingDocument = false;
      state.documents.deletingDocument = false;
      state.status = "Loading";
    },
    [fetchAllDocuments.fulfilled]: (state, action) => {
      let highestKey = action.payload.sort((a, b) => {
        return +b.key - +a.key;
      });
      state.documents.loading = false;
      state.documents.data = action.payload;
      state.documents.quantity = Object.keys(action.payload).length;
      state.documents.nextKey = highestKey[0].key + 1;
      state.status = "Succeeded";
    },
    [fetchAllDocuments.rejected]: (state, action) => {
      state.documents.loading = false;
      state.error = action.error.message;
      state.status = "Failed";
    },
    [addNewDocument.pending]: (state) => {
      state.documents.addingDocument = true;
      state.documents.deletingDocument = false;
      state.documents.loading = true;
      state.status = "Loading";
    },
    [addNewDocument.fulfilled]: (state, action) => {
      state.documents.data.push(action.payload);
      state.documents.quantity++;
      state.documents.nextKey++;
      state.documents.loading = false;
      state.status = "Succeeded";
    },
    [addNewDocument.rejected]: (state, action) => {
      state.error = action.error.message;
      state.documents.loading = false;
      state.status = "Failed";
    },
    [deleteDocument.pending]: (state) => {
      state.documents.addingDocument = false;
      state.documents.deletingDocument = true;
      state.documents.loading = true;
      state.status = "Loading";
    },
    [deleteDocument.fulfilled]: (state, action) => {
      state.documents.data = state.documents.data.filter((item) => {
        return item.id !== action.meta.arg;
      });
      state.documents.quantity--;
      state.documents.loading = false;
      state.status = "Succeeded";
    },
    [deleteDocument.rejected]: (state, action) => {
      state.error = action.error.message;
      state.documents.loading = false;
      state.status = "Failed";
    },
  },
});
export const documentActions = documentSlice.actions;
export default documentSlice.reducer;

export const quantity = (state) => state.document.documents.quantity;
export const nextKey = (state) => state.document.documents.nextKey;
export const userFilters = (state) => state.document.documents.filters;
