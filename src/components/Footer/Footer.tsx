export const Footer = ({htmlContent } : {htmlContent: string}) => {
    return (
        <footer
            dangerouslySetInnerHTML={{
                __html: htmlContent,
            }}>

        </footer>
    )
}