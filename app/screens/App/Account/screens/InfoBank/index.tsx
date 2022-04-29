/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { dimension } from '@app/constant/Theme'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, dimensions, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PostDetailData } from '../PostDetail/model'
import BankApi from '././api/BankApi'
interface BankInfoProps {
  route: { params: { data: PostDetailData; onCallBack: () => void } }
}
export type Bank = {
  id: number
  donate_request_id: number
  bank_id: number
  branch_name: string
  account_name: string
  account_number: number
  type: number
  status: number
  create_at: string
  DFBank: {
    id: number
    name: string
    key: string
  }
}

const InfoBank = (props: BankInfoProps) => {
  const { data } = props.route.params
  const [dataBank, setDataBank] = useState<Bank>({
    id: 0,
    donate_request_id: 0,
    bank_id: 0,
    branch_name: '',
    account_name: '',
    account_number: 0,
    type: 0,
    status: 0,
    create_at: '',
    DFBank: {
      id: 0,
      name: '',
      key: '',
    },
  })
  useEffect(() => {
    if (data.BankInfos && data.BankInfos.length > 0) {
      getDataBank(data.BankInfos[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataBank = async (id: number) => {
    if (data.BankInfos.length === 2) {
      showLoading()
      try {
        const res = await BankApi.getDetailBank({
          id,
        })
        setDataBank(res.data)
      } catch (error) {
      } finally {
        hideLoading()
      }
    }
  }

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
            {dataBank.id !== 0 ? (
              <Bank
                nameBank={dataBank.DFBank.name}
                name={dataBank?.account_name}
                number={dataBank?.account_number}
                branchName={dataBank?.branch_name}
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
                  {'Chưa có tài khoản người nhận'}
                </Text>
              </View>
            )}
          </View>
          <RNButton
            style={{ marginHorizontal: 15 }}
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_BANK, {
                id: data.id,
                type: dataBank.id === 0 ? 1 : 2,
                dataBank: dataBank,
                callback: getDataBank,
                onResetDataPost: props.route.params.onCallBack,
              })
            }}
            title={
              dataBank.id === 0
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
  nameBank,
  name,
  number,
  branchName,
}: {
  nameBank: string
  name: string
  number: number
  branchName: string
}) => {
  return (
    <>
      <View style={styles.v_bank}>
        <Text style={styles.txt_bank}>{nameBank}</Text>
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
