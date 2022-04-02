/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors, dimensions, fonts } from '@app/theme'
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { PostDetailData } from '../PostDetail/model'
import RNButton from '@app/components/RNButton/RNButton'
import Empty from '@app/components/Empty/Empty'
import { dimension } from '@app/constant/Theme'
interface BankInfoProps {
  route: { params: { data: PostDetailData } }
}

const InfoBank = (props: BankInfoProps) => {
  const { data } = props.route.params
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Tài khoản ngân hàng'}
      children={
        <>
          <View style={styles.v_container}>
            {data.BankInfos.length > 0 ? (
              <Bank
                name={data?.BankInfos[0]?.account_name}
                number={data?.BankInfos[0]?.account_number}
                branchName={data?.BankInfos[0]?.branch_name}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  justifyContent: 'center',
                }}
              >
                <FstImage
                  source={R.images.img_empty}
                  style={styles.imageEmpty}
                  resizeMode="contain"
                />
                <Text style={styles.textEmpty}>
                  {'Chưa có tài khoản người nhận nào'}
                </Text>
              </View>
            )}
          </View>
          <RNButton
            style={{ marginHorizontal: 15 }}
            onPress={() => {}}
            title={
              data.BankInfos.length === 0
                ? 'Thêm tài khoản ngân hàng'
                : 'Sửa tài khoản ngân hàng'
            }
          />
        </>
      }
    />
  )
}

const Bank = ({
  name,
  number,
  branchName,
}: {
  name: string
  number: number
  branchName: string
}) => {
  return (
    <>
      <View style={styles.v_bank}>
        <Text style={styles.txt_bank}>Vietcombank</Text>
        <ViewRow label="Tên tài khoản" content={name} />
        <ViewRow copy label="Số tài khoản" content={number} />
        <ViewRow label="Chi nhánh" content={branchName} />
      </View>
    </>
  )
}

const ViewRow = ({
  label,
  content,
  copy,
}: {
  label: string
  content: string | number
  copy?: boolean
}) => {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
    >
      <Text style={{ ...fonts.regular14, color: '#595959', flex: 1 }}>
        {label}
      </Text>
      <Text style={{ ...fonts.regular16, color: colors.text }}>{content}</Text>
      {copy && (
        <TouchableOpacity>
          <FstImage
            style={{ width: 24, height: 24, marginLeft: 8 }}
            source={R.images.ic_copy}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default InfoBank

const styles = StyleSheet.create({
  imageEmpty: {
    width: dimensions.width / 2,
    height: dimension.width / 2,
  },
  textEmpty: {
    ...fonts.regular14,
    color: colors.text,
    marginTop: 10,
  },
  v_container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  txt_bank: {
    ...fonts.semi_bold16,
    textAlign: 'left',
    color: colors.text,
    marginBottom: 26,
  },
  txt_title: {
    ...fonts.regular14,
    color: '#595959',
  },
  txt_title2: {
    ...fonts.regular14,
    color: '#595959',
    marginTop: 16,
  },
  text: {
    ...fonts.regular16,
    color: colors.text,
    marginTop: 8,
    flex: 1,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_copy: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  txt_copy: {
    ...fonts.semi_bold16,
    color: 'white',
  },
  v_bank: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1.5,
    marginBottom: 24,
  },
  txt_label: {
    ...fonts.regular16,
    fontWeight: '500',
  },
})
