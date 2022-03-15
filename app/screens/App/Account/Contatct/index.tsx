import R from '@app/assets/R'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme/colors'

const ContactScreen = () => {
    return (
        <ScreenWrapper
            back
            color={colors.text}
            backgroundHeader="white"
            forceInset={['left']}
            titleHeader={R.strings().contact}
        >

        </ScreenWrapper>
    )
}

export default ContactScreen
