import React, { useState } from 'react';
import { Drawer } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import EditClientProfile from './EditClientProfile';
import { BiEditAlt } from 'react-icons/bi';

// Define the dark theme styles.
const useDarkThemeStyles = createStyles(() => ({
  'drawer-body': {
    background: '#1f1f1f',
    color: 'white',
  },
  'drawer-mask': {
    backdropFilter: 'blur(5px)',
  },
  'drawer-header': {
    background: '#2c2c2c',
    color: 'white',
  },
  'drawer-content': {
    borderLeft: '2px solid #555',
  },
}));

const EditProfileDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { styles } = useDarkThemeStyles();
  const themeToken = useTheme();

  const drawerStyles = {
    mask: {
      backdropFilter: 'blur(5px)',
    },
    content: {
      borderLeft: '2px solid #555',
    },
    header: {
      borderBottom: `1px solid red`,
      color: 'white',
    },
    body: {
      fontSize: themeToken.fontSizeLG,
    },
  };

  const classNames = {
    body: styles['drawer-body'],
    mask: styles['drawer-mask'],
    header: styles['drawer-header'],
    content: styles['drawer-content'],
  };

  return (
    <> 
      <BiEditAlt 
        className = 'edit-profile' 
        onClick={() => setOpen(true)} 
        style={{
          fontSize: '1.2rem', 
          color: 'orange', 
          cursor: 'pointer'
        }}
        /> 
      <Drawer
        title={<div style={{ color: 'white' }}>Edit Profile Details</div>}  // <-- Pass styled title here
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        size='large'
        classNames={classNames}
        styles={drawerStyles}
      >
        <EditClientProfile setOpen = {setOpen} />
      </Drawer>
    </>
  )
}

export default EditProfileDrawer;
