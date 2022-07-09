import { useRouter } from "next/router"
import { Modal } from "../atoms/Modal";
import { VTitle } from "../atoms/VTitle";
import { GeneratorDapp } from "../molecules/Dapp.Generator";

export interface IProgramModalEntryProps {
  onClose: () => void;
}

export interface IProgramWrapperProps {
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const ProgramModalWrapper = ({title, description, children, onClose}: IProgramWrapperProps) => {
  return (
    <Modal onClose={onClose} className="h-full flex flex-col">
      <div className="w-full h-full flex flex-col dark:bg-dark-300/60 backdrop-blur-lg bg-light-200 justify-center items-center">

        <div className="w-full flex justify-end p-vmd items-center border-b-[1px] dark:border-b-light-500/30 border-b-light-500">
          <div className="flex flex-wrap justify-start items-center sm:px-vmd px-vsm gap-x-vsm divide-x-[1px] divide-aimbotsRed-100">
            <h3 className='text-xl font-semibold lg:text-2xl dark:text-light-200 text-dark-200'>{title}</h3>
            <p className="px-vsm">{description}</p>
          </div>
          <button onClick={onClose} type="button" className="absolute top-0 right-0 bg-transparent text-accent-dark-200 hover:text-accent-dark-100 hover:scale-110 active:scale-90 rounded-lg text-sm p-vmd ml-auto inline-flex items-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
          </button>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </Modal>
  )
}

export const ProgramModalEntry = ({onClose}) => {
  const router = useRouter();
  const { slug } = router.query;

  if(!slug){ return (
    <ProgramModalWrapper title='program not found' onClose={onClose}>
      <VTitle type="h1">This Program does not exist</VTitle>
    </ProgramModalWrapper>
    )
  }

  if(slug === 'generator'){
    return (
      <ProgramModalWrapper title="Program: Generator" description="The VIDYA Staking platform rewards the best performing stakers with a portion of the total VIDYA supply. The rewards are calculated based on the total amount of VIDYA staked in the network." onClose={onClose}>
        <GeneratorDapp/>
      </ProgramModalWrapper>
    )
  }
  else if(slug === 'multipass') {
    return (
      <ProgramModalWrapper title="Program: Multipass" onClose={onClose}>
        <VTitle type="h1">Multipass Multipass Multipass!!</VTitle>
      </ProgramModalWrapper>
    )
  }

  return (
    <ProgramModalWrapper title="early" onClose={onClose}>
      <VTitle type="h1">Program yet not implemented</VTitle>
    </ProgramModalWrapper>
  )
}