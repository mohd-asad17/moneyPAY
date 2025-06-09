export function InputBox({label, placeholder, inputType}){
    return <div>
        <div className="font-medium text-sm text-left py-2">
            {label}
            </div>
        <input type={inputType} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}