import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ScreenContainer} from '../../elements';
import {STYLE, AssetSmallButton} from '../../common';
import {MainComponent, NavigationHeader} from '../../components';
import {navigateTo} from '../../helpers';
import {Routes} from '../../navigation/routes';
import {SPACING} from '../../constants';

function HomeScreen({navigation}) {
  return (
    <ScreenContainer>
      <View style={STYLE.flex_white}>
        <NavigationHeader onPress={() => navigation.openDrawer()} />
        <ScrollView
          contentContainerStyle={[
            STYLE.padding_wrapper,
            {paddingBottom: SPACING.v20},
          ]}>
          <View style={STYLE.align_row}>
            <Text style={STYLE.large_black_20}>My Assets</Text>
            <AssetSmallButton
              style={STYLE.margin_auto}
              onPress={() => navigateTo(navigation, Routes.AddNewAsset)}
              title={'Add Asset'}
            />
          </View>
          <View style={STYLE.border_margin} />
          <MainComponent
            onProfileTimeline={() =>
              navigateTo(navigation, Routes.ProfileTimeline)
            }
            onEditAsset={() => navigateTo(navigation, Routes.EditAsset)}
            onAddTimeline={() => navigateTo(navigation, Routes.AddTimeline)}
          />
          <MainComponent
            onProfileTimeline={() =>
              navigateTo(navigation, Routes.ProfileTimeline)
            }
            onEditAsset={() => navigateTo(navigation, Routes.EditAsset)}
            onAddTimeline={() => navigateTo(navigation, Routes.AddTimeline)}
          />
          <MainComponent
            onProfileTimeline={() =>
              navigateTo(navigation, Routes.ProfileTimeline)
            }
            onEditAsset={() => navigateTo(navigation, Routes.EditAsset)}
            onAddTimeline={() => navigateTo(navigation, Routes.AddTimeline)}
          />
          <View style={{paddingVertical: SPACING.v10, borderBottomWidth: 1}}>
            <Text style={STYLE.large_black_20}>Assets Shared with me</Text>
          </View>
          <MainComponent
            onProfileTimeline={() =>
              navigateTo(navigation, Routes.ProfileTimeline, {
                assetsShared: true,
              })
            }
            notSharedWithMe={false}
            onEditAsset={() => navigateTo(navigation, Routes.EditAsset)}
            onAddTimeline={() => navigateTo(navigation, Routes.AddTimeline)}
          />
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

export default HomeScreen;
