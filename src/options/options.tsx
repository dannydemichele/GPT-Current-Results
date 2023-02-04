import "../style/base.css"
import { h, JSX, render } from "preact"
import { getUserConfig, updateUserConfig } from "src/util/userConfig"
import { useLayoutEffect, useState } from "preact/hooks"
import PromptEditor from "src/components/promptEditor"
import { getTranslation, localizationKeys, setLocaleLanguage } from "src/util/localization"
import NavBar from "src/components/navBar"
import { icons } from "src/util/icons"

const Footer = (props: { language: string; }) => (
    <div className="wcg-flex wcg-flex-col wcg-items-center wcg-p-4" >
        <p style={{ whiteSpace: "pre-line" }} className="wcg-text-sm wcg-m-0 wcg-p-1 wcg-text-center">
            {getTranslation(localizationKeys.UI.supportMe)}
        </p>
       
    </div>
)

const SocialCard = ({ icon, text }: { icon: JSX.Element, text: string }) => (
    <div className="wcg-btn wcg-btn-ghost wcg-h-28 wcg-w-36 wcg-p-2 wcg-rounded-xl wcg-flex wcg-flex-col">
        {icon}
        <p className="wcg-normal-case wcg-p-2">{text}</p>
    </div>
)


export default function OptionsPage() {

    const [language, setLanguage] = useState<string>(null)


    useLayoutEffect(() => {
        getUserConfig().then(config => {
            setLanguage(config.language)
            setLocaleLanguage(config.language)
        })
    }, [])

    const onLanguageChange = (language: string) => {
        setLanguage(language)
        updateUserConfig({ language })
        setLocaleLanguage(language)
    }

    if (!language) {
        return <div></div>
    }

    return (
        <div className="wcg-w-3/5 wcg-flex wcg-flex-col wcg-items-center">

            <NavBar
                language={language}
                onLanguageChange={onLanguageChange}
            />

            <PromptEditor
                language={language}
            />


            <div className="wcg-mt-28 wcg-self-center wcg-items-center wcg-flex wcg-flex-col">
                {/* <div className="wcg-flex wcg-flex-row wcg-gap-4">
                  
                </div> */}
                <Footer
                    language={language}
                />
            </div>

        </div >
    )
}


render(<OptionsPage />, document.getElementById("options"))
