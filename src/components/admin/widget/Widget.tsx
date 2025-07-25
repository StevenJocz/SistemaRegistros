import { IoBook, IoDocumentText, IoExtensionPuzzle, IoPeopleSharp } from 'react-icons/io5'
import style from './Widget.module.css'
import { WidgetTotal } from '../home/Admin.model';

interface WidgetProps {
    widgetData?: WidgetTotal[];
}

const Widget = ({ widgetData }: WidgetProps) => {
    return (
        <div className={style.Widget}>
            {widgetData?.map((data) => (
                <div key={data.id} className={style.Widget_Card}>
                    <div className={style.Widget_Header}>
                        <h4>{data.nombre}</h4>
                        <div className={style.Widget_Header_Circulo}>
                            <data.icono className={style.Widget_Header_Circulo_Icono} />
                        </div>
                    </div>
                    <span>{data.valor.toLocaleString()}</span>
                    <h6>{data.texto}</h6>
                </div>
            ))}
        </div>
    )
}

export default Widget