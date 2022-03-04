import { colors, dimensions, fonts, styleView } from '@app/theme'
import { StyleSheet } from 'react-native'

const { width } = dimensions
const CONTENT_VIEW_WIDTH = width - 40
const BORDER_RADIUS = 16
const BUTTON_VIEW_HEIGHT = 45

export const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  alertWrapper: {
    width: CONTENT_VIEW_WIDTH,
    backgroundColor: colors.white,
    borderRadius: BORDER_RADIUS,
  },
  contentBlock: {
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  title: {
    ...fonts.semi_bold18,
    textAlign: 'center',
    color: 'black',
  },
  content: {
    ...fonts.regular16,
    textAlign: 'center',
    marginTop: 8,
  },
  btnBlock: {
    ...styleView.rowItem,
    alignItems: 'center',
    height: BUTTON_VIEW_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: '#DEE2E6',
  },
  btnView: {
    ...styleView.centerItem,
    flex: 1,
    height: BUTTON_VIEW_HEIGHT,
  },
  btnText: {
    ...fonts.regular16,
    color: '#262626',
  },
})
