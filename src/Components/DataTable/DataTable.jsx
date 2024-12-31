import '../DataTable/dataTable.css';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';

const DataTable = (props) => {
    // const handleDelete = (id)=>{
    //     // axios.delete(`/api/${slug}/id)
    //     console.log(id +" "+ "has been deleted!")
    //   

  return (
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={[...props.columns]}
                initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                }}
                slots={{toolbar:GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter:true,
                        quickFilterProps:{debounceMs:500}
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnSelector
            />
        </div>
      
    
  )
}

export default DataTable
