import theme from '@app/constant/Theme'
import { colors, fonts } from '@app/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 998,
  },
  wrapOption: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    alignItems: 'center',
  },
  option: {
    borderTopWidth: 1,
    borderColor: colors.border,
    width: '100%',
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapCancel: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
  },
  textCancel: {
    ...fonts.semi_bold16,
    color: colors.black,
    textAlign: 'center',
  },
  wrapTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#333333',
  },
  line: {
    width: theme.dimension.width * 0.83,
    height: 1,
    marginTop: '4%',
    backgroundColor: colors.line,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
})
