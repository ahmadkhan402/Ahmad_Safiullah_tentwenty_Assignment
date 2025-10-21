import { StyleSheet } from 'react-native';
import { colors } from '../../utils/constants';
import { heightPixel, widthPixel } from '../../utils/helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,

  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPixel(16),
    paddingBottom: heightPixel(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.white,
  },
  headerTitle: {
    letterSpacing: 0.5,
  },
  searchButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: widthPixel(10),
    padding: widthPixel(8),
  },

  listContainer: {
    paddingTop: heightPixel(20),
    paddingBottom: heightPixel(10),
    paddingHorizontal: widthPixel(14),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignContent: 'center'

  },
  card: {
    // marginHorizontal: widthPixel(10),
    marginBottom: heightPixel(12),
    borderRadius: widthPixel(10),
    overflow: 'hidden',
    backgroundColor: colors.black,
    elevation: 3,
    // aspectRatio: 4 / 3,
  },
  poster: {
    aspectRatio: 6 / 4,
    borderRadius: widthPixel(10),
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: heightPixel(8),
    paddingHorizontal: widthPixel(12),
  },
  title: {
    width: '90%',
  },

});
