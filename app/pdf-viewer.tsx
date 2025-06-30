import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { NativeModules, Platform, StyleSheet, View } from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';

const PSPDFKit = NativeModules.PSPDFKit;
PSPDFKit.setLicenseKey(null);

const DOCUMENT = Platform.OS === 'ios' 
  ? 'pspdfkit-react-native-quickstart-guide.pdf'
  : 'file:///android_asset/Document.pdf';

export default function PDFViewerScreen() {
  const pdfRef = useRef<PSPDFKitView>(null);
  const router = useRouter();
  
  const handleNavigationButtonClicked = (event: any) => {
    console.log('Navigation button clicked:', event);
    
    // Destroy the PSPDFKit view and navigate back
    if (pdfRef.current) {
      pdfRef.current.destroyView();
    }
    setTimeout(() => {
      router.back();
    }, 100);
  };
  
  return (
    <View style={styles.container}>
      <PSPDFKitView
        document={DOCUMENT}
        showNavigationButtonInToolbar={true}
        configuration={{
          showThumbnailBar: 'scrollable',
          pageTransition: 'scrollContinuous',
          scrollDirection: 'vertical',
        }}
        ref={pdfRef}
        fragmentTag="PDF1"
        style={styles.pdfView}
        onNavigationButtonClicked={handleNavigationButtonClicked}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdfView: {
    flex: 1,
  },
}); 