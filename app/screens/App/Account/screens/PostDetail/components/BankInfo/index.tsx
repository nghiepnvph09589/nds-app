import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { colors, fonts } from '@app/theme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PostDetailData } from '../../model'

interface BankInfoProps {
  data: PostDetailData
}

const BankInfo = (props: BankInfoProps) => {
  const { data } = props
  return (
    <View style={styles.v_container}>
      <Bank
        title="Tài khoản chữ thập đỏ"
        name={data?.BankInfos[data?.BankInfos.length - 1]?.account_name}
        number={data?.BankInfos[data?.BankInfos.length - 1]?.account_number}
        branchName={data?.BankInfos[data?.BankInfos.length - 1]?.branch_name}
      />
      {data?.BankInfos.length > 1 && (
        <Bank
          title="Tài khoản người nhận hỗ trợ"
          name={data?.BankInfos[0]?.account_name}
          number={data?.BankInfos[0]?.account_number}
          branchName={data?.BankInfos[0]?.branch_name}
        />
      )}
    </View>
  )
}

const Bank = ({
  title,
  name,
  number,
  branchName,
}: {
  title: string
  name: string
  number: number
  branchName: string
}) => {
  return (
    <>
      <Text style={styles.txt_label}>{title}</Text>
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

export default BankInfo

const styles = StyleSheet.create({
  v_container: {
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
    marginTop: 15,
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
