function sumar(a, b){
    return a+b;
}

describe('operaciones basicas de suma', function(){

    it('should return 4 with 2+2', function(){
        const a = 2;
        const b = 2;
        const resultado = sumar(a, b);
        expect(resultado).toBe(a+b);
    })
})