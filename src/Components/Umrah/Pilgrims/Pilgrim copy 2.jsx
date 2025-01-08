import { Box } from '@mui/material'
import UmrahTabs from '../../../Tabs/UmrahTabs'
import Users from '../../Users/Users'

const Pilgrim = () => {
  return (
    <div style={{width:"100%"}}>
      <UmrahTabs />
      <Box
            sx={{
                marginTop:5,
                border: 1,
                borderRadius: 1,
                padding: '30px',
                borderColor: 'transparent',
                backgroundColor: 'white',
                boxShadow: 3,

            }}
          >
            <Users />
            
          </Box>
    </div>
  )
}

export default Pilgrim
