import { classNames } from "@/common/helpers"
import { GeneratorContext } from "@/common/providers/GeneratorProvider"
import { useLoadUserPools } from "@/hooks/dapps/generator/useLoadUser"
import { useDetectDeviceSize } from "@/hooks/useDetectIsMobileView"
import { useContext, useEffect, useMemo } from "react"
import { AuthenticatedView, UnAuthenticatedView } from "@/components/atoms/AuthenticatedView"
import { SwapInput } from "@/components/atoms/SwapInput"
import { VButton } from "@/components/atoms/VButton"
import { VItemContainer } from "@/components/atoms/VItemContainer"
import { VText } from "@/components/atoms/VText"
import { VTitle } from "@/components/atoms/VTitle"
import { DappLogin } from "@/components/molecules/DappLogin"

export interface IGeneratorDappProps {

}

export const GeneratorDapp = ({}) => {
  const { state, updatePool, setCurrentPool } = useContext(GeneratorContext);
  const { isMobileView } = useDetectDeviceSize();
  const userResults = useLoadUserPools(Object.keys(state.pools));

  useEffect(() => {
    for(const userResult of userResults) {
      updatePool(userResult.pool.name, userResult.content);
    }
  }, [JSON.stringify(userResults)])

  const pools = useMemo(() => {
    return Object.keys(state.pools).map(name => state.pools[name]);
  }, [JSON.stringify(state.pools)])

  const currentPool = useMemo(() => {
    return state.pools[state.currentPool];
  }, [JSON.stringify(state.pools), state.currentPool])

  return (
    <>
      <UnAuthenticatedView>
        <DappLogin/>
      </UnAuthenticatedView>
      <AuthenticatedView>
        <div className="flex flex-col justify-start items-center py-vsm h-full gap-y-vmd">
          <div className="flex justify-between w-full sm:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full justify-start items-start gap-x-vlrg sm:px-vlrg px-vsm">
              <VTitle type={isMobileView ? 'h5' : 'h4'}>Current Pool - <span className="text-accent-dark-200">{currentPool.symbol} ({currentPool.type})</span></VTitle>
              <div className="flex gap-x-vsm">
                <VText className="py-vsm" size="lg">Switch Pool: </VText>
                {pools.filter(pool => pool.name !== state.currentPool).map(pool => (<VButton key={pool.name} padding={false} secondary animate={false} onClick={() => setCurrentPool(pool.name)}>{`${pool.symbol} (${pool.type})`}</VButton>))}
              </div>
              {/* <VText>Create Liquidity</VText> */}
            </div>
            <div className="flex w-full justify-end items-center gap-vlrg sm:px-vmd px-vsm">
              <div className="border-[1px] border-violet-600 md:w-[380px] mobile:w-full sm:w-full  gap-y-vsm flex flex-col">
                {pools.map((pool, index) => {
                  return (
                    <div className="w-full flex flex-col border-t-[1px] border-violet-700 p-vmd" key={`${pool.name}_${index}`}>
                      <div key={index} className={classNames('w-full flex flex-col justify-center', index % 2 === 0 ? 'items-start' : 'items-end')}>
                        <VTitle type='h5' className="border-b-[1px] border-b-light-400">{pool.symbol} ({pool.type}) pool</VTitle>
                        <VText size="lg">Total deposited : <span className="font-bold text-accent-dark-100">{pool.deposited.toFixed(3)}</span></VText>
                        <VText size="lg">Total committed : <span className="font-bold text-accent-dark-100">{pool.amountCommitted.toFixed(3)}</span></VText>
                        <div className="flex gap-x-vsm justify-center items-center">
                          <VText size="lg">Rewards : <span className="font-bold text-accent-dark-100">{pool.claimAmount.toFixed(3)}</span></VText>
                          {pool.claimAmount > 0 && 
                          <button disabled={pool.isClaimingRewards} className="uppercase border-[1px] text-body-xs px-2 border-light-100 hover:border-accent-dark-100/50 rounded-[4px]">
                            Claim <span className="text-accent-dark-200 font-bold"> REWARDS</span>
                          </button>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="px-vsm">
            <VItemContainer widthSize='full' heightSize='full' dropShadow innerClassName="!rounded-[0]" className='w-full h- bg-gradient-to-br p-[1px] from-aimbotsRed-100/95 to-accent-dark-200/95 backdrop-blur-sm !rounded-[0]'>
              <div className='flex flex-col sm:p-vlrg p-vsm gap-y-vlrg h-full w-full'>
                <div id="header" className="flex w-full gap-x-vsm justify-center">
                  <div className="bg-accent-dark-600 w-full flex justify-center items-center py-vsm">
                    <VText size="lg">Stake</VText>
                  </div>
                  <div className="bg-accent-dark-600 w-full flex justify-center items-center py-vsm">
                    <VText size="lg">Commit</VText>
                  </div>
                  <div className="bg-accent-dark-600  w-full flex justify-center items-center py-vsm">
                    <VText size="lg">Withdraw</VText>
                  </div>
                </div>
                <SwapInput balance={currentPool.accountBalance} coinIcons={currentPool.image} coinSymbol={currentPool.symbol}></SwapInput>
                <div className="flex justify-center">
                  <VButton special>Stake</VButton>
                </div>     
              </div>
            </VItemContainer>
          </div>
          <div>
            
          </div>
        </div>
      </AuthenticatedView>
    </>
  )
}