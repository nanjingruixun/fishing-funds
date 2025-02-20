import { isAnyOf } from '@reduxjs/toolkit';
import { ShareAction } from '@/store';
import listenerMiddleware from '@/store/listeners';
import { syncCoinsConfigAction } from '@/store/features/coin';
import { syncFavoriteQuotationMapAction } from '@/store/features/quotation';
import { syncStocksConfigAction } from '@/store/features/stock';
import { saveSyncConfigAction } from '@/store/features/setting';
import { changeCurrentWalletCodeAction, syncWalletsConfigAction } from '@/store/features/wallet';
import { syncWebConfigAction } from '@/store/features/web';
import { syncZindexesConfigAction } from '@/store/features/zindex';

export default () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(
      syncCoinsConfigAction,
      syncZindexesConfigAction,
      syncWebConfigAction,
      syncStocksConfigAction,
      syncWalletsConfigAction,
      syncFavoriteQuotationMapAction,
      changeCurrentWalletCodeAction
    ),
    effect: (action: ShareAction, { dispatch, getState }) => {
      if (!action._share) {
        const {
          setting: {
            systemSetting: { syncConfigSetting, syncConfigPathSetting },
          },
        } = getState();
        if (syncConfigSetting && syncConfigPathSetting) {
          dispatch(saveSyncConfigAction());
        }
      }
    },
  });
};
