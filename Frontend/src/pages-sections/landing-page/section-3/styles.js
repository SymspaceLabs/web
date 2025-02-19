import { keyframes } from '@mui/material/styles';

const blob = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

export const styles = {
    gridContainer: {
      position: 'relative',
      background: '#1F1F1F',
    },
    container: {
      position: 'relative',
    },
    blobCircle: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: { xs: '300px', sm: '400px', md: '500px' },
      height: { xs: '300px', sm: '400px', md: '500px' },
      background: '#FFF',
      borderRadius: '50%',
      zIndex: 1,
      opacity: 0.3,
      filter: 'blur(80px)',
      animation: `${blob} 7s infinite`,
    },
    contentBox: {
      position: 'relative',
      zIndex: 2,
      minHeight: { xs: '400px', md: '600px' },
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      py: { xs: 4, md: 8 },
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleText: {
      width: '100%',
      maxWidth: 1200,
      fontFamily: 'Helvetica',
      color: '#fff',
      fontSize: { xs: 48, sm: 48, md: 72 },
      px: { xs: 2, sm: 0 },
      fontWeight: 'bold',
      textAlign: 'left',
    },
    descriptionText: {
      maxWidth: 1200,
      fontFamily: 'Helvetica',
      color: '#fff',
      fontSize: { xs: 14, sm: 18 },
      px: { xs: 2, sm: 0 },
      textAlign: 'justify',
      lineHeight: '30px'
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 1200,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    learnMoreButton: {
      fontFamily: 'Elemental End',
      textTransform: 'lowercase',
      color: '#fff',
      borderRadius: '50px',
      py: 2,
      px: 7.5,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        background: '#fff',
        color: '#000',
      },
    },
    
  };