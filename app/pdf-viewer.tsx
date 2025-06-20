import React, { Component } from 'react';
import { NativeModules, Platform } from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';

// Add navigation props
interface PDFViewerScreenProps {
  navigation: any; 
}

const PSPDFKit = NativeModules.PSPDFKit;
PSPDFKit.setLicenseKey(null);
const DOCUMENT =
  Platform.OS === 'ios'
    ? 'pspdfkit-react-native-quickstart-guide.pdf'
    : 'file:///android_asset/Document.pdf';

export default class PDFViewerScreen extends Component<PDFViewerScreenProps> {
  private pdfRef = React.createRef<PSPDFKitView>();
  
  render() {
    return (
      <PSPDFKitView
        document={DOCUMENT}
        configuration={{
          showThumbnailBar: 'scrollable',
          pageTransition: 'scrollContinuous',
          scrollDirection: 'vertical',
        }}
        ref={this.pdfRef}
        fragmentTag="PDF1"
        style={{ flex: 1 }}
      />
    );
  }
} 